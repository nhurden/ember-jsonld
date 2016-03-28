# Releasing

1. Start release branch: `git flow release start <release>`
2. Update package.json and bower.json versions.
3. Update CHANGELOG.
4. Finish release: `git flow release finish <release>`
5. Push master and tags: `git push origin --all; git push --tags`
6. Publish to npm: `git checkout master && npm publish .`
