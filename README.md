# Obsidian MD Plugin to control Kenku FM from notes
This plugins give the ability to control Kenku FM from obsidian notes using the Remote API


## Features
- TBD


## Contributing

If you encounter any issues or have suggestions for improvements, feel free to
open an issue or submit a pull request. Contributions are welcome!

### Development

Before you get started, ensure that you have the following software installed:

- [node.js](https://nodejs.org) (v14 or above)
- [bun.sh](https://bun.sh/) (way better than any other node package managers)

## Getting Started

```bash
bun install
```

5. Start the development server with hot-reloading using the following command:

```bash
bun dev
```

6. In **Obsidian**, open **Settings**.
7. In the side menu, select **Community plugins**.
8. Select **Turn on community plugins**.
9. Under **Installed plugins**, enable the **Kenku FM Intergration** by
   selecting the toggle button next to it.
10. Once you're ready to bundle your plugin for **production**, run the
    following command:

```bash
bun run build
```



## Source mapping
To get the source map to load in Obsidian, and thus allowing you to see your Typescript code when debugging, you might need to set the 
**sourcemapBaseUrl** parameter in **vite.config.ts**. To actual path can be found by adding the folder (test-vault) containing your .map file to the "Filesystem" 
tab in the debugger. Right-click the map file and select "Copy link address". Set **sourcemapBaseUrl** to the base address.

## Resources

Here are some resources to help you get started with building plugins for
Obsidian, Svelte, and Tailwind CSS (UnoCSS):

- [Obsidian Plugin API Documentation](https://github.com/obsidianmd/obsidian-api)
- [Svelte Documentation](https://svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [UnoCSS Documentation](https://unocss.dev/)



## License

This template is available under the [MIT License](LICENSE). Feel free to modify
and use it to create your own Obsidian plugins.
