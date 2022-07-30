<script>
  import { REPO_URL } from "$lib/siteConfig";
  import SvgIcon from "./Icons/SvgIcon.svelte";
  import MobileMenu from "./MobileMenu.svelte";
  import NavLink from "./NavLink.svelte";
  let isDark = false;
  if (typeof localStorage !== "undefined") {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      isDark = true;
    }
  }
  function toggleDarkMode() {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      isDark = false;
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      isDark = true;
    }
  }
</script>

<nav class="relative mx-auto flex w-full items-center justify-between py-4">
  <a href="#skip" class="skip-nav">Skip to content</a>
  <MobileMenu />
  <div class="grid grid-cols-4 gap-2 justify-items-center">
    <div>
      <NavLink href="/">Home</NavLink>
    </div>
    <div>
      <NavLink href="/book">Docs</NavLink>
    </div>
    <div>
      <NavLink href="/blog">Blog</NavLink>
    </div>
    <div>
      <NavLink href="/about">About</NavLink>
    </div>
  </div>
  <div class="flex items-center space-x-4">
    <!-- RSS -->
    <!-- <a
			class="rounded-lg text-gray-700 hover:bg-yellow-200 dark:text-gray-200 dark:hover:bg-yellow-800"
			rel="external"
			href={origin + '/api/rss.xml'}
			aria-label="RSS"
		>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				class="h-9 w-9 p-1"
				fill="currentColor"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
				/>
			</svg>
		</a> -->
    <!-- Github -->
    <a class="rounded-lg" href={REPO_URL} aria-label="GitHub source">
      <SvgIcon icon="github" height="24px" width="24px" />
    </a>
  </div>
</nav>

<style>
  nav {
    width: 100%;
    padding: 0.75rem 0em;
  }
  .skip-nav {
    position: absolute;
    left: -25%;
    top: -2rem;
    --tw-translate-y: -3rem;
    padding: 0.75rem 1rem;
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 0.2s;
  }
</style>
