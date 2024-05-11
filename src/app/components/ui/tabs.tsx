import { TabItem } from '@/app/ts/types';
import React, { useState, useEffect, useRef } from 'react';

interface TabsComponentProps {
  items: TabItem[];
}

const TabsComponent: React.FC<TabsComponentProps> = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const firstBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <div className="bg-transparent flex justify-center items-center py-2 w-full">
      <div className="max-w-3xl w-full">
        <div className="bg-transparent-500 rounded-xl flex items-center font-bold text-white">
          {items.map((item, index) => (
            <button
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => handleTabClick(index)}
              className={`min-w-40 outline-none py-4 text-center focus:bg-white focus:text-primary-400 font-normal border-b-2 ${
                selectedTab === index
                  ? 'bg-white text-primary border-primary'
                  : 'text-tertiary border-grayText'
              } `}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="bg-white p-2 rounded-s mt-2 min-h-96 text-tertiary">
          {items.map((item, index) => (
            <div key={index} className={selectedTab === index ? '' : 'hidden'}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabsComponent;
