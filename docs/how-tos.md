### How to Update Packages

1. type `nx migrate latest` in the terminal to update the packages. This may take a few minutes. It will also make code changes so that the newly updated packages do not cause API conflicts. Follow the instructions in the terminal when the install completes. Verify that E2E tests pass then commit the changes.

2. type `yarn upgrade-interactive --latest` use your spacebar and arrow keys to select only the green packages. After selecting all green packages press enter. Verify that E2E tests pass then commit the changes.

3. type `yarn upgrade-interactive --latest` use your spacebar and arrow keys to select 5 yellow packages. After selecting 5 yellow packages press enter. Verify that E2E tests pass then commit the changes. Continue until all yellow packages are upgraded. Do not upgrade any of the red packages unless you absolutely have to.

### How to resolve Audit Errors

1. type `yarn audit` in the terminal to see what packages have security flaws.

2. Go to [npm website](https://www.npmjs.com/) and search for the package causing the issue.

3. Follow the instructions in How to Update Packages to update only the problematic dependency. Sometimes the faulty dependency is not updated yet.

4. In such instances you will have to create a resolution for the faulty package.
