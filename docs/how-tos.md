### How to Update Packages

1. type `nx migrate latest` in the terminal to update the packages. This may take a few minutes. It will also make code changes so that the newly updated packages do not cause API conflicts. Follow the instructions in the terminal when the install completes. Verify that E2E tests pass then commit the changes.
2. type `yarn upgrade-interactive --latest` use your spacebar and arrow keys to select only the green packages. After selecting all green packages press enter. Verify that E2E tests pass. If so, make a pull request.
