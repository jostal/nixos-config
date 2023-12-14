{ pkgs, ... }: {

	programs.fish = {
		enable = true;
		interactiveShellInit = ''
			set fish_greeting
      if test -e $HOME/.config/fish/functions/rebuild.fish
        ln -s $HOME/nixos-config/scripts/rebuild.fish $HOME/.config/fish/functions/rebuild.fish
      end
			'';
		shellAliases = {
			ls = "ls -a --color=auto";
		};
		plugins = [
			{ 
				name = "tide";
				src = pkgs.fishPlugins.tide.src;
			}
		];
	};
}
