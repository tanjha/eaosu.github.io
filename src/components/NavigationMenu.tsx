"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const games = [
  { name: "Valorant", href: "/games/valorant" },
  { name: "Overwatch 2", href: "/games/overwatch" },
  { name: "League of Legends", href: "/games/league" },
  { name: "Rocket League", href: "/games/rocket-league" },
  { name: "CS2", href: "/games/cs2" },
  { name: "Apex Legends", href: "/games/apex" },
];

export default function Navigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/">Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/about">About</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Games</NavigationMenuTrigger>
          <NavigationMenuContent className="bg-card">
            <ul className="grid gap-1 grid-cols-2 w-[340px] p-3">
              {games.map((game) => (
                <li key={game.name}>
                  <NavigationMenuLink asChild>
                    <a
                      href={game.href}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-secondary transition-colors"
                    >
                      {game.name}
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <a href="/join">Join Us</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
