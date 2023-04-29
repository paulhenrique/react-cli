/**
 *
 * @param {import('plop').Plop} plop
 */

const contextPath = "temp/";
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
        path: `${contextPath}services/{{pascalCase name}}.ts`,
        templateFile: "templates/service.ts.hbs",
      },
      {
        type: "add",
        path: `${contextPath}services/{{pascalCase name}}.spec.ts`,
        templateFile: "templates/service.spec.ts.hbs",
      },
      {
        type: "add",
        path: `${contextPath}services/index.ts`,
        skipIfExists: true,
      },
      {
        type: "append",
        path: `${contextPath}services/index.ts`,
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
        path: `${contextPath}components/{{pascalCase name}}/index.tsx`,
        templateFile: "templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: `${contextPath}components/{{pascalCase name}}/{{pascalCase name}}.spec.ts`,
        templateFile: "templates/component.spec.tsx.hbs",
      },
      {
        type: "add",
        path: `${contextPath}components/index.ts`,
        skipIfExists: true,
      },
      {
        type: "append",
        path: `${contextPath}components/index.ts`,
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
        path: `${contextPath}pages/{{pascalCase name}}/index.tsx`,
        templateFile: "templates/component.tsx.hbs",
      },
      {
        type: "add",
        path: `${contextPath}pages/{{pascalCase name}}/{{pascalCase name}}.spec.ts`,
        templateFile: "templates/component.spec.tsx.hbs",
      },
      {
        type: "add",
        path: `${contextPath}pages/index.ts`,
        skipIfExists: true,
      },
      {
        type: "append",
        path: `${contextPath}pages/index.ts`,
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
        path: `${contextPath}hooks/use{{pascalCase name}}/index.ts`,
        templateFile: "templates/hook.ts.hbs",
      },
      {
        type: "add",
        path: `${contextPath}hooks/{{pascalCase name}}/use{{pascalCase name}}.spec.ts`,
        templateFile: "templates/hook.spec.ts.hbs",
      },
      {
        type: "add",
        path: `${contextPath}hooks/index.ts`,
        skipIfExists: true,
      },
      {
        type: "append",
        path: `${contextPath}hooks/index.ts`,
        unique: true,
        templateFile: "templates/indexExport.ts.hbs",
      },
    ],
  });
}
