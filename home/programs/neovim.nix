{ config, pkgs, ... }:{
  xdg.configFile = {
    "nvim".source = config.lib.file.mkOutOfStoreSymlink "/home/jostal/nixos-config/home/programs/configs/nvim";
  };

  programs.neovim = {
    enable = true;
    defaultEditor = true;
    plugins = with pkgs.vimPlugins; [
      nvim-autopairs
      cmp-buffer
      cmp-nvim-lsp
      cmp-path
      cmp-nvim-lua
      cmp_luasnip
      cmp-cmdline
      comment-nvim
      formatter-nvim
      gruvbox-nvim
      indent-blankline-nvim
      nvim-cmp
      nvim-colorizer-lua
      nvim-lspconfig
      nvim-treesitter-context
      nvim-treesitter-textobjects
      nvim-treesitter-refactor
      nvim-treesitter.withAllGrammars
      nvim-web-devicons
      null-ls-nvim
      nvim-navic
      mini-nvim
      lsp-format-nvim
      lualine-nvim
      luasnip
      plenary-nvim
      rainbow-delimiters-nvim
      telescope-nvim
      telescope-ui-select-nvim
      toggleterm-nvim
      which-key-nvim
    ];

    extraPackages = with pkgs; [
      gcc
      lua-language-server
      nil
      nodePackages.typescript-language-server
      nodejs
      rust-analyzer
      stylua
      nixd
    ];
  };
}
