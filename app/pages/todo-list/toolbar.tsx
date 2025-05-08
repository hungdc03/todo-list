import { Card, Input, Select } from 'antd';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { STATUS_OPTIONS } from '~/utils/const';

interface ToolbarProps {
  onSearch: (query: string) => void;
  onChangeStatus: (status: string) => void;
  onCreateTask: () => void;
}

export const ALL_STATUS = 'all';

const STATUS_OPTS = [
  {
    label: 'All',
    value: ALL_STATUS,
  },
  ...STATUS_OPTIONS,
];

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, onChangeStatus, onCreateTask }) => {
  const handleSearch = (e: any) => {
    onSearch(e.target.value);
  };

  return (
    <Card>
      <div className="mb-3 flex gap-2">
        <div className="flex-1">
          <Input placeholder="Search" onChange={handleSearch} />
        </div>
        <div className="flex-1">
          <Select
            options={STATUS_OPTS}
            className="w-full"
            placeholder="Status"
            onChange={(value) => onChangeStatus(value)}
            defaultValue={ALL_STATUS}
          />
        </div>
      </div>
      <button
        className="w-full flex bg-black text-white font-semibold items-center justify-center gap-2 border-2 rounded-md py-2 cursor-pointer hover:shadow-md"
        onClick={onCreateTask}
      >
        <CirclePlus className="w-4 h-4" />
        Create Task
      </button>
    </Card>
  );
};

export default Toolbar;
