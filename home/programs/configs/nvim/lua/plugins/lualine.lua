-- statusline plugins
local navic = require("nvim-navic")
local function diff_source()
  local gitsigns = vim.b.gitsigns_status_dict
  if gitsigns then
    return {
      added = gitsigns.added,
      modified = gitsigns.changed,
      removed = gitsigns.removed,
    }
  end
end

local location = { "location", padding = 0 }
local lualine = require('lualine')

local customTheme = require('plugins.customTheme')


lualine.setup {
  options = {
    icons_enabled = true,
    theme = customTheme,
    component_separators = { left = "", right = "" },
    section_separators = { left = "", right = "" },
    disabled_filetypes = { "alpha", "dashboard" },
    always_divide_middle = true,
    globalstatus = true,
  },
  sections = {
    lualine_a = { "branch" },
    lualine_b = {
      { "diff", source = diff_source },
      "diagnostics",
    },
    lualine_c = {
    },
    lualine_x = { "encoding", "filetype" },
    lualine_z = { location }
  },
  winbar = {
    lualine_a = {
      {
        "filetype",
        icon_only = true,
        color = {
          bg = "#000"
        }
      },
      {
        "filename",
      }
    },
    lualine_b = {},
    lualine_c = {
      {
        function()
          return navic.get_location()
        end,
        cond = function()
          return navic.is_available()
        end,
      }
    },
    lualine_x = {},
    lualine_y = {},
    lualine_z = {
      {
        "fileformat",
      },
    }
  },
  inactive_winbar = {
    lualine_a = {
      {
        "filename",
      },
    },
    lualine_b = {},
    lualine_c = {},
    lualine_x = {},
    lualine_y = {},
    lualine_z = { "fileformat" },
  }
}
