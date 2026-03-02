import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
    intro: {
        name: "Rafa Studio",
        tagline:
            "Building and scripting for Roblox. Clean systems, no shortcuts.",
    },
    sections: [
        {
            id: "building",
            navLabel: "Building",
            title: "Building",
            layout: "split",
            items: [
                {
                    id: "vibe-ship",
                    title: "Vibe Ship",
                    description:
                        "A cruise ship built to feel alive. Neon reflects off water, light shifts as you move through spaces, and none of it costs you frames. The aesthetic does the work. The engine doesn't feel it.",
                    meta: "Vibe Environment / 3 weeks / Optimized",
                    imageUrls: [
                        "/assets/projects/vibe_ship/one.png",
                        "/assets/projects/vibe_ship/two.png",
                    ],
                    importance: "secondary",
                    stats: {
                        metric: "Stable 60 FPS and quick loading",
                        context: "on budget devices",
                    },
                },
                {
                    id: "simpsons-speedrun",
                    title: "Simpsons Speedrun",
                    description:
                        "Five levels of Springfield chaos, each one faster than the last. Every asset and mechanic was built once and reused, so when the scope grew, nothing broke and nothing got rebuilt from scratch.",
                    meta: "Arcade Game / 2 weeks / Modular Design",
                    imageUrls: [
                        "/assets/projects/simpsons_speedrun/one.png",
                        "/assets/projects/simpsons_speedrun/two.png",
                    ],
                    importance: "secondary",
                    stats: {
                        metric: "80-90% asset reusability",
                        context: "across 5 game levels",
                    },
                },
            ],
        },
        {
            id: "scripting",
            navLabel: "Scripting",
            title: "Scripting",
            layout: "detail",
            items: [
                {
                    id: "inventory",
                    title: "Modular Inventory System",
                    contentPairs: [
                        {
                            label: "Problem",
                            text: "Default Roblox backpack couldn't handle a complex RPG with 500+ item types, stacking logic, and concurrent trade sessions without risking data corruption.",
                        },
                        {
                            label: "Solution",
                            text: "Custom inventory built on OOP meta-tables with ProfileStore persistence and session locking. All mutations return typed Result values so errors are explicit, never swallowed. The trading layer runs on a promise chain so each step is auditable and cancellable.",
                        },
                    ],
                    codeSnippet: `local inventory = player.inventory

-- All mutations return Result<T, InventoryError>
local result = inventory:addItem({ id = "apple", amount = 5 })

if result:isErr() then
  -- InventoryError.Full | InventoryError.InvalidItem | InventoryError.Locked
  logger:warn("addItem failed", result:unwrapErr())
  return result
end

-- Batch query with typed filter
local items = inventory:getItems({
  id = { "sword", "apple" },
  amount = "all",
  exclude = { type = "consumable" },
})
  :expect("inventory must be loaded before querying")

-- Trade session: each step is a Result
local session = inventory:trade({ with = otherPlayer })
  :expect(TradeError.SessionExpired)

local offer = session:sendOffer({ by = player, id = "sword" })
  :mapErr(function(err)
    return TradeError.wrap(err, { item = "sword", peer = otherPlayer })
  end)

offer.onAccept:connect(function()
  session:commit()
    :andThen(Promise.log("trade committed"))
    :catch(Promise.warn("commit failed, rolling back"))
end)

offer.onDecline:connect(function(reason: DeclineReason)
  session:abort(reason)
end)`,
                },
                {
                    id: "pathfinding",
                    title: "Server-Side NPC Controller",
                    contentPairs: [
                        {
                            label: "Problem",
                            text: "Client-side NPCs were desyncing under load. Moving everything server-side fixed correctness but saturated CPU with 50 concurrent enemies.",
                        },
                        {
                            label: "Solution",
                            text: "Hybrid architecture: the server owns path nodes via A* and emits waypoint updates, clients interpolate movement visually. Server load dropped 85%. NPC state is a typed enum making transitions explicit and loggable.",
                        },
                    ],
                    codeSnippet: `local npc = NPC.new("Grunt", humanoidRootPart)
  :withState(NPCState.Idle)
  :withSpeed(25)

-- Patrol returns Result<PathHandle, PathError>
local path = npc:setPatrolPath({ waypoint1, waypoint2, waypoint3 })

path:match({
  ok  = function(handle) handle:start() end,
  err = function(e)
    -- PathError.Unreachable | PathError.InvalidWaypoint
    logger:error("patrol failed to initialize", e)
  end,
})

-- Chase with typed constraints
npc.onPlayerDetected:connect(function(player: Player)
  npc:chase(player, { maxDistance = 100 })
    :andThen(function(outcome: ChaseOutcome)
      if outcome == ChaseOutcome.LostTarget then
        npc:setState(NPCState.Searching)
      end
    end)
end)

-- State machine: transitions carry a typed reason
npc.onStateChanged:connect(function(
  from: NPCState,
  to: NPCState,
  reason: Option<StateChangeReason>
)
  logger:trace("NPC %s: %s -> %s (%s)",
    npc.id, from, to,
    reason:unwrapOr("none")
  )
end)

npc.onArrived:connect(function(waypoint: Waypoint)
  npc:playAnimation("idle_scan")
    :expect("animation must exist before NPC is spawned")
end)`,
                },
                {
                    id: "datastore",
                    title: "Event Bus System",
                    contentPairs: [
                        {
                            label: "Problem",
                            text: "Scattered signal connections across modules made debugging a guessing game and created hidden coupling that broke silently when load order shifted.",
                        },
                        {
                            label: "Solution",
                            text: "Centralized event bus with typed payloads and built-in audit logging. Modules emit and listen without importing each other. Every signal carry a schema, meaning mismatched payloads are caught at the boundary, not deep inside a handler.",
                        },
                    ],
                    codeSnippet: `local bus = Bus.new({ strict = true })

-- Listeners receive typed payloads. No raw any
bus:on("game.player-joined", function(event: PlayerJoinedEvent)
  local player = event.player
    :expect("player-joined must carry a valid Player")

  onboarding:run(player)
    :catch(function(err: OnboardingError)
      logger:error("onboarding failed for %s", player.Name, err)
    end)
end)

-- Emit is typed against the registered schema
bus:emit("game.player-joined", {
  player = Option.some(newPlayer),
  timestamp = os.clock(),
  isReturning = dataStore:has(newPlayer.UserId),
})

-- Multiple handlers, same event make the order deterministic
bus:on("combat.damage-dealt", damageHandler)
bus:on("combat.damage-dealt", function(event: DamageEvent)
  -- Second handler only runs if the first didn't abort the chain
  if event.result:isOk() then
    analytics:record(event)
  end
end)

-- Remove by reference, no wildcard surprises
bus:off("combat.damage-dealt", damageHandler)

-- Inspect live signal table
local snapshot: BusSnapshot = bus:view()

-- Audit log makes every emit traceable
local logger = Logger.new("BUS")
bus.onLog:connect(function(entry: BusLogEntry)
  logger:trace("[%s] %s | listeners: %d | payload: %s",
    entry.timestamp,
    entry.event,
    entry.listenerCount,
    entry.payloadSchema
  )
end)`,
                },
            ],
        },
    ],
    contact: {
        header: "Available for freelance or contract work.",
        prerequisites:
            "Come with a clear project goal, a specific problem to solve, and a realistic timeline. The more defined the scope, the faster we move.",
        hype: "Let's do it right.",
        email: "rafasvallen@gmail.com",
        timezone: "US Central Time / Flexible hours",
    },
};
