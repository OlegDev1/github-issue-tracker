import markdownIt from "markdown-it";

export default function getMarkdownit() {
  const md = markdownIt();
  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(["class", "issue__body-heading"]);
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.ordered_list_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(["class", "issue__body-orderedList"]);
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.list_item_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(["class", "issue__body-listItem"]);
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.paragraph_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrPush(["class", "issue__body-paragraph"]);
    return self.renderToken(tokens, idx, options);
  };

  return md;
}
