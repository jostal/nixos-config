require("config.options")
require("config.lazy")

vim.cmd([[let g:gruvbox_disable_terminal_colors = 0]])
vim.cmd([[let g:gruvbox_material_transparent_background = 2]])
vim.cmd([[colorscheme gruvbox-material]])

vim.api.nvim_create_autocmd("User", {
  pattern = "VeryLazy",
  callback = function()
    require("config.autocmds")
    require("config.keymaps")
  end,
})
