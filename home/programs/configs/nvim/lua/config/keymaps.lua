local utils = require("utils")

-- Toggle Term
vim.api.nvim_set_keymap('t', '<esc>', '<C-\\><C-n>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<A-t>', "<cmd>TermSelect<cr>", { desc = "Focus selected terminal" })

-- nvim tree
vim.api.nvim_set_keymap('n', 'n', "<cmd>lua require('nvim-tree.api').tree.focus()<cr>", { desc = "Focus nvim tree" })
vim.api.nvim_set_keymap('n', '<A-n>', "<cmd>lua require('nvim-tree.api').tree.toggle()<cr>", { desc = "Close nvim tree" })
vim.api.nvim_set_keymap('n', '<C-\\>', "<cmd>lua require('nvim-tree.api').node.open.vertical()<cr>",
  { desc = "Vertical Split nvim tree file" })

-- Telescope
vim.api.nvim_set_keymap('n', 'ff', "<cmd>lua require('telescope.builtin').find_files()<cr>",
  { desc = "Search for files" })
vim.api.nvim_set_keymap('n', 'fg', "<cmd>lua require('telescope.builtin').live_grep()<cr>", { desc = "Search in files" })
vim.api.nvim_set_keymap('n', 'fb', "<cmd>lua require('telescope.builtin').buffers()<cr>", { desc = "Search for buffers" })
