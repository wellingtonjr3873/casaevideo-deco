import { HTMLWidget } from "apps/admin/widgets.ts";
import { useState, useEffect } from 'preact/hooks';

export interface Props{
    title: string;
    description: HTMLWidget;
    labelCta: string;
}

export default function PrivacyPolicyPopup({ title, description, labelCta}: Props){
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('privacyPolicyAccepted');
    if (!hasAccepted) {
      setShowPopup(true);
    }
  }, []);

  const acceptPrivacyPolicy = () => {
    localStorage.setItem('privacyPolicyAccepted', 'true');
    setShowPopup(false);
  };

  return (
    <div>
      {showPopup && (
        <div class="fixed z-50 left-1/2 -translate-x-1/2 shadow-lg bottom-4 bg-neutral-50 p-4 w-11/12 mx-auto rounded-lg">
          <div class="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-center">
            <div class={`flex flex-col gap-2 lg:w-3/5`}>
                <h2 class={`text-xs text-neutral-dark lg:text-xl font-bold`}>{title}</h2>
                <div class="text-xs text-neutral-dark lg:text-lg"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
            <button class={`bg-brand-primary-1 rounded-md text-neutral-50 py-1 px-3 w-36 mx-auto lg:py-2.5 lg:px-4 text-sm lg:text-base lg:mr-0 lg:w-72`} onClick={acceptPrivacyPolicy}>{labelCta}</button>
          </div>
        </div>
      )}
    </div>
  );
};
