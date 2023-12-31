opts = function()
  local actions = require("telescope.actions")
  local theme = require("telescope.themes")
  return {
    pickers = {
      find_files = { hidden = true },
      live_grep = {
        additional_args = function(opts)
          return { "--hidden" }
        end,
      },
    },
    defaults = {
      mappings = { i = { ["<esc>"] = actions.close } },
    },

    extensions = {
      ["ui-select"] = {
        theme.get_dropdown({
          -- even more opts
        }),
      },
      file_browser = {
        grouped = true,
        hidden = true,
        hijack_netrw = true,
        respect_gitignore = false,
      },
    },
  }
end
config = function(_, opts)
  local telescope = require("telescope")
  telescope.setup(opts)
  telescope.load_extension("ui-select")
end

config()
