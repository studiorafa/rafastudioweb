import { SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  intro: {
    name: "Rafa Studio",
    tagline: "Building and scripting for Roblox. Clean systems, no shortcuts.",
  },
  sections: [
    {
      id: "building",
      navLabel: "Building",
      title: "Building",
      layout: "split",
      items: [
        {
          id: "neon-district",
          title: "Neon District",
          description: "A high-fidelity cyberpunk environment designed for a roleplay server. Focused on lighting performance and texture memory management to maintain 60fps on mobile devices.",
          meta: "Commercial Hub / 4 weeks / Mobile Optimized",
          imageUrl: "https://picsum.photos/id/132/1600/900" 
        },
        {
          id: "medieval-keep",
          title: "Ironhold Keep",
          description: "Modular castle architecture system allowing for procedural generation of interiors. Uses custom collision meshes to ensure smooth player movement during combat.",
          meta: "PVP Arena / 2 weeks / Custom Collisions",
          imageUrl: "https://picsum.photos/id/1036/1600/900"
        },
        {
          id: "space-station",
          title: "Orbital Outpost",
          description: "Zero-gravity simulation map. Built entirely with parts to reduce download size, using vertex painting for wear and tear details instead of heavy textures.",
          meta: "Sci-Fi Sim / 3 weeks / Part-based",
          imageUrl: "https://picsum.photos/id/1004/1600/900"
        }
      ]
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
            { label: "Problem", text: "Default Roblox backpack was insufficient for a complex RPG with 500+ item types and stacking requirements." },
            { label: "Solution", text: "Wrote a custom inventory using OOP meta-tables. Data persists via ProfileService with session locking to prevent item duplication." }
          ],
          codeSnippet: `function Inventory:AddItem(itemData)
  local stack = self:FindStack(itemData.Id)
  if stack and stack.Count < stack.Max then
    stack.Count += 1
    self:FireClient("UpdateSlot", stack)
    return true
  end
  return self:CreateNewSlot(itemData)
end`
        },
        {
          id: "pathfinding",
          title: "Server-Side NPC Controller",
          contentPairs: [
            { label: "Problem", text: "Client-side NPCs were desyncing, but server-side movement was consuming too much CPU for 50 concurrent enemies." },
            { label: "Solution", text: "Implemented a hybrid approach where the server calculates path nodes (A*) and clients interpolate movement visually. Reduced server load by 85%." }
          ]
        },
        {
          id: "datastore",
          title: "Async Data Handler",
          contentPairs: [
            { label: "Problem", text: "Game failing to save data during sudden server shutdowns." },
            { label: "Solution", text: "Created a wrapper around DataStoreService that implements a write-buffer and handles 'BindToClose' automatically to ensure queue flushing." }
          ],
          codeSnippet: `game:BindToClose(function()
  for _, player in ipairs(Players:GetPlayers()) do
    coroutine.wrap(function()
      DataManager:Save(player)
    end)()
  end
  task.wait(2) -- Force yield for saves
end)`
        }
      ]
    }
  ],
  contact: {
    header: "Available for freelance or contract work.",
    prerequisites: "Define your project, identify specific blockers, and establish a clear timeline before reaching out.",
    hype: "Let's build it right.",
    email: "hello@rafastudio.com",
    timezone: "US Central Time / Flexible hours"
  }
};