{ config, pkgs, ... }: {
  programs.tmux = {
    enable = true;
    shell = "${pkgs.fish}/bin/fish";
    terminal = "tmux-256color";
    historyLimit = 100000;
    prefix = "C-Space";
    escapeTime = 0;
    keyMode = "vi";
    extraConfig = ''
      bind v copy-mode
      bind -T copy-mode-vi v send-keys -X begin-selection
      bind-key -T copy-mode-vi C-v send-keys -X rectangle-toggle
      bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel
      bind-key b set-option status

      # Quick reload
      bind r source-file ${pkgs.tmux}/.tmux.conf; display "reloaded"

      # Split panes
      bind C-v split-window -v -c '#{pane_current_path}'
      bind C-h split-window -h -c '#{pane_current_path}'

      # Switch panes
      bind -n C-Left select-pane -L
      bind -n C-Right select-pane -R
      bind -n C-Up select-pane -U
      bind -n C-Down select-pane -D
    '';
  };
}
