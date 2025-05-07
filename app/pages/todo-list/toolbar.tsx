import { Button, Card, Row, Input, Col, Select, Space } from 'antd';
import React, { useState } from 'react';
import { CirclePlus, Search } from 'lucide-react';
import { useSearchParams } from 'react-router';
import _ from 'lodash';

const MAX_DEBOUNCE_TIME = 500;

const Toolbar = ({ handleCreate }: any) => {
  const [search, setSearch] = useSearchParams();

  const handleSearch = _.debounce((e: any) => {
    setSearch({ search: e.target.value });
  }, MAX_DEBOUNCE_TIME);

  return (
    <Card>
      <div className="mb-3 flex gap-2">
        <div className="flex-1">
          <Input placeholder="Tìm kiếm" onChange={handleSearch} />
        </div>
        <div className="flex-1">
          <Select className="w-full" placeholder="Trạng thái" />
        </div>
      </div>
      <button
        className="w-full flex bg-black text-white font-semibold items-center justify-center gap-2 border-2 rounded-md py-2 cursor-pointer hover:shadow-md"
        onClick={handleCreate}
      >
        <CirclePlus className="w-4 h-4" />
        Tạo mới
      </button>
    </Card>
  );
};

export default Toolbar;
