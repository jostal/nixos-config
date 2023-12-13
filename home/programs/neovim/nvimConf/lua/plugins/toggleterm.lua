local M = {
    "akinsho/toggleterm.nvim",
    event = "VeryLazy",
    opts = {
      open_mapping = [[z]],
      insert_mappings = false,
      start_in_insert = true,
      auto_scroll = true
    },
    config = function (_, opts)
      require("toggleterm").setup(opts)
    end,
}

return M
