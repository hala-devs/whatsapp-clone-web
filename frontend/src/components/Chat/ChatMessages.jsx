import React from "react";
import cn from 'classnames';
import moment from "moment";

export default function ChatMessages({ content, createdAt, isSender }) {
    return (
        <div className={cn('flex', {
            'justify-end': isSender,   // الرسائل المرسلة تظهر على اليمين
            'justify-start': !isSender // الرسائل الواردة تظهر على اليسار
        })}>
            <div className="max-w-xl">
                <div className={cn('py-2 px-3 rounded-xl flex items-end space-x-2', {
                    "bg-[#005C4B]": isSender,    // لون خلفية المرسل
                    "bg-[#202C33]": !isSender     // لون خلفية المستقبل
                })}>
                    <p className="text-white">{content}</p>  {/* عرض محتوى الرسالة الفعلي */}
                    <p className="text-[#b0bac0] text-xs">
                        {moment(createdAt).format("hh:mm A")} {/* عرض وقت الرسالة الفعلي */}
                    </p>
                </div>
            </div>
        </div>
    );
}