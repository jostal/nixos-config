{
	description = "Jostal flake config";

	nixConfig = {
		experimental-features = [ "nix-command" "flakes" ];
		substituters = [
      "https://cache.nixos.org?priority=10"
      "https://anyrun.cachix.org"
      "https://hyprland.cachix.org"
      "https://nix-community.cachix.org"
      "https://nix-gaming.cachix.org"
		];
    trusted-public-keys = [
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
      "anyrun.cachix.org-1:pqBobmOjI7nKlsUMV25u9QHa9btJK65/C8vnO3p346s="
      "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "nix-gaming.cachix.org-1:nbjlureqMbRAxR1gJ/f3hxemL9svXaZF/Ees8vCUUs4="
    ];
	};

	# Inputs
	inputs = {
    # hyprland.url = "github:hyprwm/Hyprland";
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
		home-manager = {
			url = "github:nix-community/home-manager/release-23.11";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		ags.url = "github:Aylur/ags";

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

				specialArgs = { inherit inputs; };
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
						home-manager.extraSpecialArgs = { inherit inputs; };
						home-manager.users.jostal = import ./home;
					}
				];
			};
		};
	};

}
