function URLBuilder(layer,start,end,nuclide){

    url = new URL("https://www.imis.bfs.de/ogc/opendata/ows")
	url.searchParams.append("service","WFS")
	url.searchParams.append("version","1.0.0")
	url.searchParams.append("request","GetFeature")
	url.searchParams.append("typeName","opendata:" + layer)
	url.searchParams.append("CQL_FILTER","(sample_begin DURING "+start+"/"+end+") AND (nuclide = '"+nuclide+"')")
	url.searchParams.append("VIEWPARAMS","order:sample_begin")
	url.searchParams.append("outputFormat","application/json")

    return url.href
}
