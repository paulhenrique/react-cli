/**
 *
 * @param {import('plop').Plop} plop
 */
export default function (plop) {
  // service generator
  plop.setGenerator("service", {
    description: "Novo service para a aplicação",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/services/{{pascalCase name}}.ts",
        templateFile: "templates/service.ts.hbs",
      },
      {
        type: "add",
        path: "src/services/{{pascalCase name}}.spec.ts",
        templateFile: "templates/service.spec.ts.hbs",
      },
      {
        type: "add",
        path: "src/services/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/services/index.ts",
        unique: true,
        templateFile: "templates/indexExport.ts.hbs",
      },
    ],
  });

  plop.setGenerator("component", {
    description: "Novo componente para a aplicação",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/{{pascalCase name}}/{{pascalCase name}}.spec.ts",
        templateFile: "templates/component.spec.tsx.hbs",
      },
      {
        type: "add",
        path: "src/components/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/components/index.ts",
        unique: true,
        templateFile: "templates/indexExportFolder.ts.hbs",
      },
    ],
  });

  plop.setGenerator("page", {
    description: "Nova página para a aplicação",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "service name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/index.tsx",
        templateFile: "templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/{{pascalCase name}}/{{pascalCase name}}.spec.ts",
        templateFile: "templates/component.spec.tsx.hbs",
      },
      {
        type: "add",
        path: "src/pages/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/pages/index.ts",
        unique: true,
        templateFile: "templates/indexExportFolder.ts.hbs",
      },
    ],
  });

  plop.setGenerator("hook", {
    description: "Novo hook para a aplicação",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "hook name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/hooks/use{{pascalCase name}}/index.ts",
        templateFile: "templates/hook.ts.hbs",
      },
      {
        type: "add",
        path: "src/hooks/{{pascalCase name}}/use{{pascalCase name}}.spec.ts",
        templateFile: "templates/hook.spec.ts.hbs",
      },
      {
        type: "add",
        path: "src/hooks/index.ts",
        skipIfExists: true,
      },
      {
        type: "append",
        path: "src/hooks/index.ts",
        unique: true,
        templateFile: "templates/indexExport.ts.hbs",
      },
    ],
  });

  plop.setGenerator("module", {
    description: "Novo hook para a aplicação",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "hook name please",
      },
    ],
    actions: [
      ...plop.getGenerator("hook"),
      ...plop.getGenerator("page"),
      ...plop.getGenerator("component"),
      ...plop.getGenerator("service"),
    ],
  });
}
