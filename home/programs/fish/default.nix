{ pkgs, ... }: {

	programs.fish = {
		enable = true;
		interactiveShellInit = ''
			set fish_greeting
			'';
		shellAliases = {
			ls = "ls -a --color=auto";
      agsreload = "
        ags -q;
        and git add .;
        and git commit -m 'ags change';
        and sudo nixos-rebuild switch
        and ags;
        end
      ";
		};
		plugins = [
			{ 
				name = "tide";
				src = pkgs.fishPlugins.tide.src;
			}
		];
	};
}
