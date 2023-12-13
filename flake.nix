{
	description = "Jostal flake config";

	nixConfig = {
		experimental-features = [ "nix-command" "flakes" ];
		substituters = [
			"https://aseipp-nix-cache.global.ssl.fastly.net"
			"https://cache.nixos.org"
		];
	};

	# Inputs
	inputs = {
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
		home-manager = {
			url = "github:nix-community/home-manager/release-23.11";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		sddm-sugar-candy-nix = {
			url = "gitlab:Zhaith-Izaliel/sddm-sugar-candy-nix";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = {
		self,
		nixpkgs,
		home-manager,
		sddm-sugar-candy-nix,
		...
		} @ inputs:
	{
		nixosConfigurations = {
			nixos = nixpkgs.lib.nixosSystem {
				system = "x86_64-linux";

				specialArgs = inputs;
				modules = [
					./hosts/nixos

					sddm-sugar-candy-nix.nixosModules.default

					{
						nixpkgs = {
							overlays = [
								sddm-sugar-candy-nix.overlays.default
							];
						};
					}

					# Home manager
					home-manager.nixosModules.home-manager {
						home-manager.useGlobalPkgs = true;
						home-manager.useUserPackages = true;
						home-manager.extraSpecialArgs = inputs;
						home-manager.users.jostal = import ./home;
					}
				];
			};
		};
	};

}
