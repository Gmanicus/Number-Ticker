// Get string from element and grab all number matches from it. Put their increment and set values in lists.
function tickUp(element, iterations = 200, duration = 1000) {
    // Yes, I know. This sets the variable every time when it really doesn't need to be. Apparently RegExp() doesn't like this regex with respective changes D:<
    var regexPat = /[+-]?\d+(?:\.\d+)?/g;

    var string = element.innerHTML;
    
    var number_values = [];
    var increment_values = [];
    // Match for positive and negative numbers, decimal points, and number groups. Push them to lists
    while (match = regexPat.exec(string)) {
        number_values.push(match[0]);
        increment_values.push( parseInt(match[0]) / iterations );
    }

    //ticker(element, string, number_values, increment_values, iterations, duration);

    var total_iter = 0;
    var cur_vals = [];
    for (let step = 0; step < number_values.length; step++) {
        cur_vals.push(0);
    }

    // Take lists and increment each number with its increment_value
    function ticker() {
        total_iter++;
        cur_str = string;
        for (index = 0; index < cur_vals.length; ++index) {
            cur_vals[index] += increment_values[index];
            cur_vals[index] = cur_vals[index];

            re = new RegExp("\\b" + number_values[index].toString() + "\\b");

            count = cur_str.match(re)
            
            if (count) {
                count = count.length;
            } else {
                console.log(`${count} when looking for ${number_values[index]} in ${cur_str}`);
                continue;
            }

            cur_str = cur_str.replace(re, Math.round(cur_vals[index]).toString());
        }

        element.innerHTML = cur_str;

        if (total_iter == iterations) {
            clearInterval(tickerRepeater);
        }
    }

    var tickerRepeater = setInterval(ticker, duration / iterations);
}
