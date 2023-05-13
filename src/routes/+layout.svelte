<script>
  import "@skeletonlabs/skeleton/styles/skeleton.css";
  import "../app.postcss";
  import vitamin from "$lib/vitamin-d.png";
</script>

<header role="banner">
  <nav>
    <div id="nav-header">
      <img src={vitamin} alt="" />
      <span class="header-text">
        <span class="l1">新樓醫院心臟科附屬</span>
        <br />
        <span class="l2">電機社</span>
      </span>
    </div>
    <ul id="nav-links">
      <li><a href="#">主頁</a></li>
      <li><a href="#">ABOUT</a></li>
    </ul>
  </nav>
</header>

<slot />

<style>
  :global(:root) {
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  :global(body) {
    margin: 0;
    /* min-width: 320px; */
    /* min-height: 100vh; */
  }

  :global(a) {
    font-weight: 500;
    color: inherit;
    text-decoration: inherit;
  }
  :global(a:hover) {
    color: #535bf2;
  }
  header {
    display: flex;
    justify-content: center;
    padding: 1.5em 3.5em;
  }

  header nav {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    align-items: center;
    max-width: 50em;
  }

  #nav-header {
    margin-right: auto;
  }

  #nav-header img {
    margin-right: 1em;
    height: 3.4em;
  }

  #nav-header .header-text {
    display: inline-block;
  }

  .header-text .l1 {
    font-size: 100%;
    white-space: nowrap;
  }

  .header-text .l2 {
    font-size: 180%;
    white-space: nowrap;
  }

  #nav-links {
    list-style: none;
    margin: 0;
  }

  #nav-links li {
    display: inline;
    font-size: 110%;
    margin-left: 2em;
  }
</style>
