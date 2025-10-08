import { Badge } from './badge';
import { memo } from 'react';

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const TagFilter = memo(({ allTags, selectedTags, onTagToggle }: TagFilterProps) => (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge
      variant={selectedTags.length === 0 ? "action-selected" : "action-unselected"}
      onClick={() => onTagToggle('')}
    >
      全部标签
    </Badge>
    {allTags.map(tag => (
      <Badge
        key={tag}
        variant={selectedTags.includes(tag) ? "action-selected" : "action-unselected"}
        onClick={() => onTagToggle(tag)}
      >
        {tag}
      </Badge>
    ))}
  </div>
));
