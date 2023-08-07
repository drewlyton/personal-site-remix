import type IStory from "~/data/Story";

export function filterStories(
  storiesArray: Array<IStory>,
  searchString: string
): Array<IStory> {
  if (!storiesArray) return [];
  return storiesArray.filter((story): Boolean => {
    return (
      story.title.toLowerCase().includes(searchString.toLowerCase()) ||
      story.description.toLowerCase().includes(searchString.toLowerCase())
    );
  });
}
