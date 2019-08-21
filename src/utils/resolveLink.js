import linksById from '../../linksById.json';
function resolveLink(id) {
  return linksById[id] || `/`;
}

export default resolveLink;
