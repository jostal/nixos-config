{ pkgs, ... }: {

	programs.fish = {
		enable = true;
		interactiveShellInit = ''
			set fish_greeting
      fish_add_path $HOME/nixos-config/scripts
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
