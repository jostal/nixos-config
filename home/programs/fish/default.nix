{ pkgs, ... }: {

	programs.fish = {
		enable = true;
		interactiveShellInit = ''
			set fish_greeting
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
