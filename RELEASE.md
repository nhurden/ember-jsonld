# Releasing

1. Start release branch: `git flow release start <release>`
2. Update package.json and bower.json versions
3. Finish release: `git flow flow release finish <release>`
4. Push master and tags: `git push origin --all; git push --tags` 
5. Publish to npm: `git checkout master && npm publish .` 
