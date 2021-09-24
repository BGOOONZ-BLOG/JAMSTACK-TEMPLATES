const getDomainOwnerProfileId = checkout =>
	checkout.domain.owner.profile.edges[0].node.id;

export default getDomainOwnerProfileId;
