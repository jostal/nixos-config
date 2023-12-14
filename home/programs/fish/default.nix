{ pkgs, ... }: {

	programs.fish = {
		enable = true;
		interactiveShellInit = ''
			set fish_greeting
			'';
		shellAliases = {
			ls = "ls -a --color=auto";
      agsreload = "
        begin
        ags -q;
        git add .;
        git commit -m 'ags change';
        sudo nixos-rebuild switch
        ags;
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
