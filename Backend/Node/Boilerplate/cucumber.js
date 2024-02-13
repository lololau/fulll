module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["./features/**/*.ts", "./features/*.ts"],
    worldParameters: {
      repository: "default",
    },
  }
};