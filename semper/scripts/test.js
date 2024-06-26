function(context, args)
{
	const EZ_21 = ["open", "release", "unlock"];

	if (!args){
		return "`DNo args`";
	}

	// Target system
	if (args && args.t) {
		const strings = args.t.call();
		#D(":::" + strings);
	}

	return `
		\`1Context	:::\` {{context}}
		\`1Args		:::\` {{args}}
	`
	.replace(/\{\{context}}/g, JSON.stringify(context))
	.replace(/\{\{args}}/g, JSON.stringify(args));
}
