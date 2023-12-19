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
        "buffers",
        symbols = {
          alternate_file = ""
        }
      }
    },
    lualine_b = {},
    lualine_c = { { navic.get_location, cond = navic.is_available } },
    lualine_x = {},
    lualine_y = {},
    lualine_z = { },
  },
  inactive_winbar = {
    lualine_a = {
      {
        "filename",
        color = { fg='#ddc7a1', bg='#504945'}
      },
    },
    lualine_b = {},
    lualine_c = { { navic.get_location, cond = navic.is_available } },
    lualine_x = {},
    lualine_y = {},
    lualine_z = {},
  }
}
