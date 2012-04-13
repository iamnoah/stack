// creates a hierarchical outline from all the h1, h2, and h3 elements (first one per slide)
(function() {
	var h1 = [], h2 = [], position = -1,
		outline = d3.select('body').append('ol').
			classed('outline',true);
	// for each slide, find the first header element and stick it in the outline
	// XXX slides without a header get left out
	d3.selectAll("section").each(function() {
		position++;
		var header = d3.select(this).select('h1, h2, h3')[0][0];
		if(!header) return;

		var tag = header.tagName.toUpperCase(),
			parent, list, li;
		if(tag === 'H1') {
			li = outline.append('li');
			li.append('a').
				html(header.innerHTML).
				property('href','#').
				on('click',scrollTo(position));
			h1.push({
				tag: header,
				selection: li,
				children: []
			});
		} else if(tag === 'H2') {
			parent = d3.last(h1).selection,
			list = parent.select('.children');
			if(list.empty()) {
				list = parent.append('ol').
					classed('children',true);
			}
			li = list.append('li');
			li.append('a').
				html(header.innerHTML).
				property('href','#').
				on('click',scrollTo(position));

			h2.push({
				tag: header,
				selection: li
			});
		} else if(tag === 'H3') {
			parent = d3.last(h2).selection;
			list = parent.select('.children');
			if(list.empty()) {
				list = parent.append('ol').
					classed('children',true);
			}
			list.append('li').
				append('a').
					html(header.innerHTML).
					property('href','#').
					on('click',scrollTo(position));
		}
	});

	function scrollTo(pos) {
		return function() {
			stack.position(pos);
			 d3.event.stopPropagation();
			 d3.event.preventDefault();
		};
	}
})();
