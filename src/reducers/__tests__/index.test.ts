import { index } from "..";
import { config } from "../config";
import { ConfigAction } from "../config/actions";
import { entries } from "../entries";
import { EntryAction } from "../entries/actions";
import { stories } from "../stories";
import { StoriesAction } from "../stories/actions";
import { ui } from "../ui";
import { UIAction } from "../ui/actions";
import { words } from "../words";
import { WordsAction } from "../words/actions";

/*
 *  Combined State test. Confirms no new reducers added without reason.
 */

const fakeAction = {type: 'FOO'};

test('Reducers properly combined', () => {

    const expected = {
        config: config(undefined, fakeAction as ConfigAction),
        entries: entries(undefined, fakeAction as EntryAction),
        stories: stories(undefined, fakeAction as StoriesAction),
        ui: ui(undefined, fakeAction as UIAction),
        words: words(undefined, fakeAction as WordsAction)
    };

    const actual = index(undefined, fakeAction);

    expect(actual).toEqual(expected);
})
