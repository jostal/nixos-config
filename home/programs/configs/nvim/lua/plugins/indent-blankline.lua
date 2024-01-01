local highlight = {
  "RainbowRed",
  "RainbowYellow",
  "RainbowBlue",
  "RainbowOrange",
  "RainbowGreen",
  "RainbowViolet",
  "RainbowCyan"
}

local hooks = require("ibl.hooks")

hooks.register(hooks.type.HIGHLIGHT_SETUP, function()
  vim.api.nvim_set_hl(0, "RainbowRed", { fg = "#EA6962" })
  vim.api.nvim_set_hl(0, "RainbowYellow", { fg = "#D8A657" })
  vim.api.nvim_set_hl(0, "RainbowBlue", { fg = "#7DAEA3" })
  vim.api.nvim_set_hl(0, "RainbowOrange", { fg = "#E78A4E" })
  vim.api.nvim_set_hl(0, "RainbowGreen", { fg = "#A9B665" })
  vim.api.nvim_set_hl(0, "RainbowViolet", { fg = "#D3869b" })
  vim.api.nvim_set_hl(0, "RainbowCyan", { fg = "#7daea3" })
end)

vim.g.rainbow_delimiters = { highlight = highlight }
require("ibl").setup {
  scope = {
    highlight = highlight,
  }
}

hooks.register(hooks.type.SCOPE_HIGHLIGHT, hooks.builtin.scope_highlight_from_extmark)
