local M = {
    "nvim-tree/nvim-tree.lua",
    config = function()
        require("nvim-tree").setup({
          git = {
            enable = true,
            ignore = false,
            timeout = 500,
          }
        })
    end,
}

return M
