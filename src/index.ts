import { Command, flags } from "@oclif/command";
import { copyDir, addFileInDir } from "./utils/copyer";
import { parseTempalteConfig } from "./utils/parse";
import { genSchema } from './utils/graphql2ts/gen-schema'
import path = require("path");

const copyTemplate = async () => {
  const templateDir = path.join(__dirname, "../", "template");
  const sourceDir = path.join(__dirname, "../", "dist");
  //拷贝模板
  copyDir(templateDir, sourceDir, ["node_modules", 'template.ts']);
};

class EggTypeGraphqlcli extends Command {
  static description = "一个egg模板生成工具";

  static flags = {
    version: flags.version({ char: "v", description: "显示当前版本号" }),
    help: flags.help({ char: "h", description: "帮助信息" }),
    // 生成模板
    template: flags.string({ char: "t", description: "生成egg ts通用模板" }),
    graphql: flags.string({
      char: "g",
      description: "根据graphql schema生成typeGraphql代码",
    }),
  };

  static args = [{ name: "template" }, { name: 'graphql' }];

  async run() {
    const { flags, args } = this.parse(EggTypeGraphqlcli);
    // copyTemplate();
    // parseTempalteConfig();
    if (flags.graphql) {
      const filePath = path.join(process.cwd(), flags.graphql)
      // console.log('根据graphql schema生成typeGraphql代码')
      genSchema(filePath);
    }
  }
}

export = EggTypeGraphqlcli;
