local utils = require("utils")
local km = vim.api.nvim_set_keymap

-- Toggle Term
vim.api.nvim_set_keymap('t', '<esc>', '<C-\\><C-n>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<A-t>', "<cmd>TermSelect<cr>", { desc = "Focus selected terminal" })

-- mini.files
-- vim.api.nvim_set_keymap('n', 'n', '<cmd>lua MiniFiles.open()<cr>', { desc = "Open mini.files" })

-- nvim tree
km('n', 'n', "<cmd>lua require('nvim-tree.api').tree.focus()<cr>", { desc = "Focus nvim tree" })
km('n', '<A-n>', "<cmd>lua require('nvim-tree.api').tree.close()<cr>", { desc = "Close nvim tree" })
-- km('n', '<A-n>', "<cmd>lua require('nvim-tree.api').tree.toggle()<cr>", { desc = "Toggle nvim tree" })
km('n', '<C-v>', "<cmd>lua require('nvim-tree.api').node.open.vertical()<cr>", { desc = "Vertical split nvim tree file" })
km('n', '<C-h>', "<cmd>lua require('nvim-tree.api').node.open.horizontal()<cr>",
  { desc = "Horizontal split from nvim tree" })

-- Telescope
vim.api.nvim_set_keymap('n', 'ff', "<cmd>lua require('telescope.builtin').find_files()<cr>",
  { desc = "Search for files" })
vim.api.nvim_set_keymap('n', 'fg', "<cmd>lua require('telescope.builtin').live_grep()<cr>", { desc = "Search in files" })
vim.api.nvim_set_keymap('n', 'fb', "<cmd>lua require('telescope.builtin').buffers()<cr>", { desc = "Search for buffers" })

-- nvim tmux nav
km('n', '<C-Left>', "<cmd>TmuxNavigateLeft<cr>", { desc = "Navigate left" })
km('n', '<C-Right>', "<cmd>TmuxNavigateRight<cr>", { desc = "Navigate right" })
km('n', '<C-Up>', "<cmd>TmuxNavigateUp<cr>", { desc = "Navigate up" })
km('n', '<C-Down>', "<cmd>TmuxNavigateDown<cr>", { desc = "Navigate down" })
