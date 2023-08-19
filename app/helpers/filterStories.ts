import type Story from "~/data/Story";

export function filterStories(
  storiesArray: Array<Story>,
  searchString: string
): Array<Story> {
  if (!storiesArray) return [];
  return storiesArray.filter((story): Boolean => {
    return (
      story.title.toLowerCase().includes(searchString.toLowerCase()) ||
      story.description.toLowerCase().includes(searchString.toLowerCase())
    );
  });
}
