import React from 'react';

export const BrandIcons = {
  Spotify: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
        <path fill="#1ed760" d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128c70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644c-30.053-18.357-67.885-22.515-112.44-12.335a7.98 7.98 0 0 1-9.552-6.007a7.97 7.97 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276c3.76 2.308 4.952 7.215 2.644 10.975m15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289c-34.406-21.148-86.853-27.273-127.548-14.92c-5.278 1.594-10.852-1.38-12.454-6.649c-1.59-5.278 1.386-10.842 6.655-12.446c46.485-14.106 104.275-7.273 143.787 17.007c4.692 2.89 6.175 9.034 3.286 13.72zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978c-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405c-3.362 5.69-10.73 7.565-16.4 4.187z" />
      </svg>
    ),
    name: 'Spotify',
    color: 'green-500'
  },
  Amazon: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M14.048 14.693a6.1 6.1 0 0 1-2.051 1.338a5.5 5.5 0 0 1-2.194.186a3 3 0 0 1-2.194-1.162a3.98 3.98 0 0 1 .066-4.531c1.448-1.821 3.85-1.722 5.836-2.04v-1.02a1.448 1.448 0 0 0-1.854-1.34c-.933.154-1.24.626-1.525 1.47c-.088.21-.263.231-.472.187c-.603 0-1.206-.098-1.81-.175c-.285 0-.647-.165-.526-.527c.124-.542.364-1.05.702-1.492a4.56 4.56 0 0 1 3.379-1.722a5.62 5.62 0 0 1 4.3.943a3.83 3.83 0 0 1 1.02 3.204v4.059a2.62 2.62 0 0 0 .592 1.667c.156.16.276.35.352.56a.38.38 0 0 1-.11.384c-.549.46-1.097.932-1.646 1.382a.504.504 0 0 1-.757 0a4.9 4.9 0 0 1-1.108-1.371m-.493-4.388c-1.35.076-3.182.263-3.291 1.974c-.06.475.056.956.329 1.35a1.48 1.48 0 0 0 2.194-.11c.888-.878.779-2.15.724-3.27zm-1.536 9.928A15.04 15.04 0 0 1 2.146 16.6c-.154-.098-.253-.493.055-.384a20.14 20.14 0 0 0 14.92 1.91c.997-.187 1.919-.703 2.895-.878c.867.395-1.24 1.228-1.525 1.448a15.9 15.9 0 0 1-6.472 1.536" />
        <path fill="white" d="M19.994 16.58c-.592 0-1.042.054-1.59.12c0 0-.121 0-.121-.055c.208-.811 2.808-.998 3.488-.636c.384.208.176.746.143 1.097a4 4 0 0 1-1.207 2.194c-.197.22-.406 0-.263-.208a6.3 6.3 0 0 0 .592-2.063c.044-.493-.735-.395-1.042-.45" />
      </svg>
    ),
    name: 'Amazon',
    color: 'yellow-500'
  },
  Linkedin: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
        <g fill="none">
          <rect width={256} height={256} fill="#fff" rx={60}></rect>
          <rect width={256} height={256} fill="#0a66c2" rx={60}></rect>
          <path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"></path>
        </g>
      </svg>
    ),
    name: 'LinkedIn',
    color: 'blue-500'
  },
  Netflix: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
        <defs>
          <path id="logosNetflixIcon0" fill="#b1060f" stroke="#000" d="m141.676 41.275l-.067 38.361l-.068 38.361l-3.156-8.905l-.006-.017l-4.078 85.402c4.01 11.324 6.158 17.369 6.182 17.393c.031.032 2.317.17 5.078.307c8.366.415 18.734 1.304 26.599 2.282c1.821.226 3.388.342 3.483.257c.094-.084.145-39.143.114-86.797l-.058-86.644zm-61.538-.115v86.732c0 47.703.047 86.779.104 86.836s3.011-.222 6.565-.62c3.553-.398 8.465-.893 10.914-1.1c3.756-.317 14.97-1.038 16.268-1.046c.378-.002.402-1.95.457-36.735l.058-36.734l2.713 7.677l.96 2.713l4.077-85.381l-1.401-3.96a32066 32066 0 0 0-6.283-17.754l-.225-.628z"></path>
          <path id="logosNetflixIcon1" fill="url(#logosNetflixIcon3)" d="M80.138 41.16v48.685l34.296 90.976c.004-2.085.008-3.211.012-5.594l.058-36.734l2.713 7.677c15.104 42.738 23.218 65.652 23.266 65.7c.031.032 2.317.17 5.078.307c8.366.415 18.734 1.304 26.599 2.282c1.821.226 3.388.342 3.483.257c.064-.058.107-19.21.118-46.227l-34.136-98.14l-.016 9.287l-.068 38.361l-3.156-8.905c-3.084-8.701-5.143-14.52-17.532-49.55a32066 32066 0 0 0-6.283-17.754l-.225-.628z"></path>
          <path id="logosNetflixIcon2" fill="#e50914" d="m80.139 41.16l34.365 97.377v-.044l2.713 7.677c15.104 42.738 23.218 65.652 23.266 65.7c.031.032 2.317.17 5.078.307c8.366.415 18.734 1.304 26.599 2.282c1.812.225 3.37.34 3.48.258l-34.1-96.737v.017l-3.156-8.905c-3.084-8.701-5.143-14.52-17.532-49.55c-3.332-9.42-6.159-17.408-6.283-17.754l-.225-.628z"></path>
          <radialGradient id="logosNetflixIcon3" cx="48.34%" cy="49.419%" r="70.438%" fx="48.34%" fy="49.419%" gradientTransform="matrix(1 0 0 .55088 0 .222)">
            <stop offset="0%"></stop>
            <stop offset="100%" stopOpacity={0}></stop>
          </radialGradient>
        </defs>
        <path d="M0 0h255.904v255.904H0z"></path>
        <use href="#logosNetflixIcon0" strokeWidth={2.96}></use>
        <use href="#logosNetflixIcon1"></use>
        <use href="#logosNetflixIcon2"></use>
        <use href="#logosNetflixIcon0" strokeWidth={2.96}></use>
        <use href="#logosNetflixIcon1"></use>
        <use href="#logosNetflixIcon2"></use>
      </svg>
    ),
    name: 'Netflix',
    color: 'red-500'
  },
  Vodafone: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12a12 12 0 0 0 12-12A12 12 0 0 0 12 0m4.25 1.12c.32 0 .65.03.86.1c-2.17.45-3.9 2.47-3.89 4.78c0 .05 0 .11.01.17c3.64.89 5.27 3.08 5.27 6.11c.04 3.03-2.36 6.36-6.41 6.37c-3.27.01-6.68-2.79-6.7-7.28C5.38 8.4 7 5.54 9.04 3.85c2-1.66 4.73-2.72 7.21-2.73"></path>
      </svg>
    ),
    name: 'Vodafone',
    color: 'red-500'
  },
  Revolut: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M20.913 6.957C20.913 3.12 17.79 0 13.95 0H2.424v3.86h10.978c1.738 0 3.177 1.366 3.209 3.044a3.08 3.08 0 0 1-.888 2.232a3.08 3.08 0 0 1-2.214.93H9.232a.276.276 0 0 0-.275.275v3.431q0 .09.052.162L16.265 24h5.311l-7.273-10.094c3.663-.184 6.61-3.261 6.61-6.95M6.894 5.923h-4.47V24h4.47z"></path>
      </svg>
    ),
    name: 'Revolut',
    color: 'blue-500'
  },
  Apple: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"></path>
      </svg>
    ),
    name: 'Apple',
    color: 'gray-500'
  },
  Slack: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" {...props}>
        <path fill="#de1c59" d="M27.255 80.719c0 7.33-5.978 13.317-13.309 13.317S.63 88.049.63 80.719s5.987-13.317 13.317-13.317h13.309zm6.709 0c0-7.33 5.987-13.317 13.317-13.317s13.317 5.986 13.317 13.317v33.335c0 7.33-5.986 13.317-13.317 13.317c-7.33 0-13.317-5.987-13.317-13.317zm0 0"></path>
        <path fill="#35c5f0" d="M47.281 27.255c-7.33 0-13.317-5.978-13.317-13.309S39.951.63 47.281.63s13.317 5.987 13.317 13.317v13.309zm0 6.709c7.33 0 13.317 5.987 13.317 13.317s-5.986 13.317-13.317 13.317H13.946C6.616 60.598.63 54.612.63 47.281c0-7.33 5.987-13.317 13.317-13.317zm0 0"></path>
        <path fill="#2eb57d" d="M100.745 47.281c0-7.33 5.978-13.317 13.309-13.317s13.317 5.987 13.317 13.317s-5.987 13.317-13.317 13.317h-13.309zm-6.709 0c0 7.33-5.987 13.317-13.317 13.317s-13.317-5.986-13.317-13.317V13.946C67.402 6.616 73.388.63 80.719.63c7.33 0 13.317 5.987 13.317 13.317zm0 0"></path>
        <path fill="#ebb02e" d="M80.719 100.745c7.33 0 13.317 5.978 13.317 13.309s-5.987 13.317-13.317 13.317s-13.317-5.987-13.317-13.317v-13.309zm0-6.709c-7.33 0-13.317-5.987-13.317-13.317s5.986-13.317 13.317-13.317h33.335c7.33 0 13.317 5.986 13.317 13.317c0 7.33-5.987 13.317-13.317 13.317zm0 0"></path>
      </svg>
    ),
    name: 'Slack',
    color: 'purple-500'
  },
  Plausible: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M12.184.002c-.638-.01-1.289.022-1.725.1c-1.858.322-3.424 1.11-4.72 2.376C4.405 3.781 3.581 5.3 3.181 7.193l-.139.644L3.008 24c.291.008.591-.04.842-.06c2.348-.287 4.344-1.709 5.431-3.866c.275-.55.472-1.182.61-1.97c.113-.67.12-.892.101-4.381l-.017-3.674l.142-.357c.197-.49.743-1.035 1.232-1.233l.358-.142l3.346-.006c1.84 0 3.454-.025 3.58-.049c.585-.113 1.211-.603 1.462-1.146c.072-.15.168-.442.21-.639c.065-.329.06-.419-.036-.789c-.298-1.1-1.35-2.623-2.425-3.514C16.624 1.163 15.28.49 13.828.148c-.382-.086-1.007-.137-1.644-.146m8.536 6.8c-.05.18-.098.367-.172.522a2.59 2.59 0 0 1-1.822 1.43c-3.673.056-2.539.055-3.673.056l-3.248.006l-.27.107c-.313.126-.827.64-.953.953l-.107.268l.017 3.576c.015 2.889.007 3.582-.06 4.125a9 9 0 0 0 1.568.139a8.99 8.99 0 0 0 8.992-8.992a9 9 0 0 0-.272-2.19"></path>
      </svg>
    ),
    name: 'Plausible',
    color: 'green-500'
  },
  Vercel: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
        <g fill="none">
          <rect width={256} height={256} fill="#f4f2ed" rx={60}></rect>
          <path fill="#000" d="m128 34l95 164.853H33z"></path>
        </g>
      </svg>
    ),
    name: 'Vercel',
    color: 'gray-900'
  },
  Supabase: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128" {...props}>
        <defs>
          <linearGradient id="deviconSupabase0" x1={53.974} x2={94.163} y1={54.974} y2={71.829} gradientTransform="translate(29.387 60.096)scale(1.1436)" gradientUnits="userSpaceOnUse">
            <stop offset={0} stopColor="#249361"></stop>
            <stop offset={1} stopColor="#3ecf8e"></stop>
          </linearGradient>
          <linearGradient id="deviconSupabase1" x1={36.156} x2={54.484} y1={30.578} y2={65.081} gradientTransform="translate(29.387 60.096)scale(1.1436)" gradientUnits="userSpaceOnUse">
            <stop offset={0}></stop>
            <stop offset={1} stopOpacity={0}></stop>
          </linearGradient>
        </defs>
        <path fill="url(#deviconSupabase0)" d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z" transform="translate(-27.722 -60.338)"></path>
        <path fill="url(#deviconSupabase1)" fillOpacity={0.2} d="M102.24 186.21c-3.267 4.117-9.904 1.862-9.977-3.397l-1.156-76.906h51.715c9.365 0 14.587 10.817 8.763 18.149z" transform="translate(-27.722 -60.338)"></path>
        <path fill="#3ecf8e" d="M53.484 2.128c3.267-4.117 9.905-1.862 9.977 3.396l.508 76.907H12.902c-9.365 0-14.587-10.817-8.764-18.149z"></path>
      </svg>
    ),
    name: 'Supabase',
    color: 'green-500'
  },
  Canva: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
        <path fill="white" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12s12-5.373 12-12S18.627 0 12 0M6.962 7.68c.754 0 1.337.549 1.405 1.2c.069.583-.171 1.097-.822 1.406c-.343.171-.48.172-.549.069c-.034-.069 0-.137.069-.206c.617-.514.617-.926.548-1.508c-.034-.378-.308-.618-.583-.618c-1.2 0-2.914 2.674-2.674 4.629c.103.754.549 1.646 1.509 1.646c.308 0 .65-.103.96-.24c.5-.264.799-.47 1.097-.8c-.073-.885.704-2.046 1.851-2.046c.515 0 .926.205.96.583c.068.514-.377.582-.514.582s-.378-.034-.378-.17c-.034-.138.309-.07.275-.378c-.035-.206-.24-.274-.446-.274c-.72 0-1.131.994-1.029 1.611c.035.275.172.549.447.549c.205 0 .514-.31.617-.755c.068-.308.343-.514.583-.514c.102 0 .17.034.205.171v.138c-.034.137-.137.548-.102.651c0 .069.034.171.17.171c.092 0 .436-.18.777-.459c.117-.59.253-1.298.253-1.357c.034-.24.137-.48.617-.48c.103 0 .171.034.205.171v.138l-.136.617c.445-.583 1.097-.994 1.508-.994c.172 0 .309.102.309.274c0 .103 0 .274-.069.446c-.137.377-.309.96-.412 1.474c0 .137.035.274.207.274s.685-.206 1.096-.754l.007-.004c-.002-.068-.007-.134-.007-.202c0-.411.035-.754.104-.994c.068-.274.411-.514.617-.514c.103 0 .205.069.205.171c0 .035 0 .103-.034.137c-.137.446-.24.857-.24 1.269c0 .24.034.582.102.788c0 .034.035.069.07.069c.068 0 .548-.445.89-1.028c-.308-.206-.48-.549-.48-.96c0-.72.446-1.097.858-1.097c.343 0 .617.24.617.72c0 .308-.103.65-.274.96h.102a.77.77 0 0 0 .584-.24a.3.3 0 0 1 .134-.117c.335-.425.83-.74 1.41-.74c.48 0 .924.205.959.582c.068.515-.378.618-.515.618l-.002-.002c-.138 0-.377-.035-.377-.172s.309-.068.274-.376c-.034-.206-.24-.275-.446-.275c-.686 0-1.13.891-1.028 1.611c.034.275.171.583.445.583c.206 0 .515-.308.652-.754c.068-.274.343-.514.583-.514c.103 0 .17.034.205.171c0 .069 0 .206-.137.652c-.17.308-.171.48-.137.617c.034.274.171.48.309.583c.034.034.068.102.068.102c0 .069-.034.138-.137.138c-.034 0-.068 0-.103-.035c-.514-.205-.72-.548-.789-.891c-.205.24-.445.377-.72.377c-.445 0-.89-.411-.96-.926a1.6 1.6 0 0 1 .075-.649c-.203.13-.422.203-.623.203h-.17c-.447.652-.927 1.098-1.27 1.303a.9.9 0 0 1-.377.104c-.068 0-.171-.035-.205-.104c-.095-.152-.156-.392-.193-.667c-.481.527-1.145.805-1.453.805c-.343 0-.548-.206-.582-.55v-.376c.102-.754.377-1.2.377-1.337a.074.074 0 0 0-.069-.07c-.24 0-1.028.824-1.166 1.373l-.103.445c-.068.309-.377.515-.582.515c-.103 0-.172-.035-.206-.172v-.137l.046-.233c-.435.31-.87.508-1.075.508c-.308 0-.48-.172-.514-.412c-.206.274-.445.412-.754.412c-.352 0-.696-.24-.862-.593c-.244.275-.523.553-.852.764c-.48.309-1.028.549-1.68.549c-.582 0-1.097-.309-1.371-.583c-.412-.377-.651-.96-.686-1.509c-.205-1.68.823-3.84 2.4-4.8c.378-.205.755-.343 1.132-.343m9.77 3.291c-.104 0-.172.172-.172.343c0 .274.137.583.309.755a1.7 1.7 0 0 0 .102-.583c0-.343-.137-.515-.24-.515z"></path>
      </svg>
    ),
    name: 'Canva',
    color: 'blue-500'
  },
  Twitter: {
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" {...props}>
        <g fill="none">
          <rect width={256} height={256} fill="#fff" rx={60}></rect>
          <rect width={256} height={256} fill="#1d9bf0" rx={60}></rect>
          <path fill="#fff" d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13"></path>
        </g>
      </svg>
    ),
    name: 'Twitter',
    color: 'blue-400'
  },
};
