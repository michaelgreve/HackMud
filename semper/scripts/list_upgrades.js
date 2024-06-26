function(context, args)
{
	const upgrLst =  #hs.sys.upgrades();
	const orderBy = ["tier", "name", "type", "loaded", "rarity"];

	if (args === null || !orderBy.includes(args["orderBy"])) {
		return "Usage: semper.list_upgrades { orderBy: \"" + orderBy.sort().join(" | ") + "\", ascending: true }";
	}

	const isAsc  = args.hasOwnProperty("ascending") ? args["ascending"] : true;

	let rl = [];

	// Compare functions
	const cmpAlpha = (a, b) => {
		const au = a["name"].toUpperCase();
		const bu = b["name"].toUpperCase();

		return au === bu ? 0 : (au < bu ? -1 : 1);
	};
	const cmpTier = (a, b) => a["tier"] - b["tier"];
	const cmpRarity = (a, b) => a["rarity"] - b["rarity"];
	const cmpLoaded = (a, b) => {
		if (a["loaded"] > b["loaded"]) return -1;
		if (a["loaded"] < b["loaded"]) return 1;

		return isAsc ? (a["i"] - b["i"]) : (b["i"] - a["i"]);
	};
	const cmpType = (a, b) => {
		if (a["type"] < b["type"]) return -1;
		if (a["type"] > b["type"]) return 1;

		return isAsc ? (a["i"] - b["i"]) : (b["i"] - a["i"]);
	}

	// Align the following item based on the length of the type
	const align = (array, type, item) => {
		const max = Math.max(...array.map(a => a[type].length + 1));
		return " ".repeat(max - item[type].length);
	}

	// Prettify output to match sys.upgrades
	const pretty = (array) => {
		let r = "";
		array.map(a => {
			const id = a["i"].toString().padStart(3, "0");
			r += (a.loaded ? "`V" + id : "`C" + id) + "` ";
			r += "tier_" + a["tier"] + " ";
			r += a["type"] + align(array, "type", a);
			r += "`" + a["rarity"] + a["name"] + "`";
			r += "\n";
		});
		return r;
	}

	switch (args["orderBy"]) {
		case "tier":
			rl = upgrLst.sort(cmpTier);
			break;
		case "rarity":
			rl = upgrLst.sort(cmpRarity);
			break;
		case "name":
			rl = upgrLst.sort(cmpAlpha);
			break;
		case "loaded":
			rl = upgrLst.sort(cmpLoaded);
			break;
		case "tyepe":
			rl = upgrLst.sort(cmpType);
			break;
		default:
			break
	}


	return isAsc ? pretty(rl) : pretty(rl.reverse());
}