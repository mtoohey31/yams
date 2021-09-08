# yams

Recipes...in yaml.

## Schema Usage

### [`yaml-language-server`](https://github.com/redhat-developer/yaml-language-server)

Include the following line at the beginning of any recipe:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/mtoohey31/yams/master/schema.yaml
```

Alternatively, if there is a specific directory that you keep your recipes in, you can use the language server setting `yaml.schemas` (documented [here](https://github.com/redhat-developer/yaml-language-server#language-server-settings)) to specify that the schema be used for all yaml files inside that directory. The exact configuration steps will depend on what editor you are using.
