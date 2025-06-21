import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
} from "react-share";
import { BsTwitterX } from "react-icons/bs";

export default function SocialShare({ title }) {
  const shareUrl = window.location.href;

  return (
    <div>
      <div className="mt-6 flex items-center gap-2">
        <p className="font-semibold">Share:</p>
        <div className="flex gap-3">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={35} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={title}>
            <span className="w-[35px] h-[35px] bg-black text-white rounded-full flex items-center justify-center text-sm">
              <BsTwitterX />
            </span>
          </TwitterShareButton>

          <WhatsappShareButton url={shareUrl} title={title}>
            <WhatsappIcon size={35} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}
