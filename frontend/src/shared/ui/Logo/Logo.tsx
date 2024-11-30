import { FC } from "react";
import s from "./Logo.module.css";

export const Logo: FC = ({ ...props }) => {
  return (
    <div className={s.logoContainer} {...props}>
      <svg
        width="172"
        height="27"
        viewBox="0 0 172 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.63 26.28C11.7633 26.28 10.0367 25.9767 8.45 25.37C6.88667 24.74 5.52167 23.865 4.355 22.745C3.21167 21.6017 2.31333 20.2717 1.66 18.755C1.00667 17.2383 0.68 15.57 0.68 13.75C0.68 11.93 1.00667 10.2617 1.66 8.745C2.31333 7.22833 3.22333 5.91 4.39 4.79C5.55667 3.64667 6.92167 2.77167 8.485 2.165C10.0717 1.535 11.7983 1.22 13.665 1.22C15.555 1.22 17.2933 1.54667 18.88 2.2C20.49 2.83 21.855 3.775 22.975 5.035L20.7 7.24C19.7667 6.26 18.7167 5.53667 17.55 5.07C16.3833 4.58 15.135 4.335 13.805 4.335C12.4283 4.335 11.145 4.56833 9.955 5.035C8.78833 5.50166 7.77333 6.155 6.91 6.995C6.04667 7.835 5.37 8.83833 4.88 10.005C4.41333 11.1483 4.18 12.3967 4.18 13.75C4.18 15.1033 4.41333 16.3633 4.88 17.53C5.37 18.6733 6.04667 19.665 6.91 20.505C7.77333 21.345 8.78833 21.9983 9.955 22.465C11.145 22.9317 12.4283 23.165 13.805 23.165C15.135 23.165 16.3833 22.9317 17.55 22.465C18.7167 21.975 19.7667 21.2283 20.7 20.225L22.975 22.43C21.855 23.69 20.49 24.6467 18.88 25.3C17.2933 25.9533 15.5433 26.28 13.63 26.28ZM33.5868 26.21C31.7202 26.21 30.0635 25.8017 28.6168 24.985C27.1702 24.1683 26.0268 23.0483 25.1868 21.625C24.3468 20.1783 23.9268 18.545 23.9268 16.725C23.9268 14.8817 24.3468 13.2483 25.1868 11.825C26.0268 10.4017 27.1702 9.29333 28.6168 8.5C30.0635 7.68333 31.7202 7.275 33.5868 7.275C35.4302 7.275 37.0752 7.68333 38.5218 8.5C39.9918 9.29333 41.1352 10.4017 41.9518 11.825C42.7918 13.225 43.2118 14.8583 43.2118 16.725C43.2118 18.5683 42.7918 20.2017 41.9518 21.625C41.1352 23.0483 39.9918 24.1683 38.5218 24.985C37.0752 25.8017 35.4302 26.21 33.5868 26.21ZM33.5868 23.27C34.7768 23.27 35.8385 23.0017 36.7718 22.465C37.7285 21.9283 38.4752 21.17 39.0118 20.19C39.5485 19.1867 39.8168 18.0317 39.8168 16.725C39.8168 15.395 39.5485 14.2517 39.0118 13.295C38.4752 12.315 37.7285 11.5567 36.7718 11.02C35.8385 10.4833 34.7768 10.215 33.5868 10.215C32.3968 10.215 31.3352 10.4833 30.4018 11.02C29.4685 11.5567 28.7218 12.315 28.1618 13.295C27.6018 14.2517 27.3218 15.395 27.3218 16.725C27.3218 18.0317 27.6018 19.1867 28.1618 20.19C28.7218 21.17 29.4685 21.9283 30.4018 22.465C31.3352 23.0017 32.3968 23.27 33.5868 23.27ZM54.4736 26.21C52.677 26.21 51.067 25.8133 49.6436 25.02C48.2436 24.2267 47.1353 23.1183 46.3186 21.695C45.502 20.2717 45.0936 18.615 45.0936 16.725C45.0936 14.835 45.502 13.19 46.3186 11.79C47.1353 10.3667 48.2436 9.25833 49.6436 8.465C51.067 7.67167 52.677 7.275 54.4736 7.275C56.037 7.275 57.4486 7.625 58.7086 8.325C59.9686 9.025 60.972 10.075 61.7186 11.475C62.4886 12.875 62.8736 14.625 62.8736 16.725C62.8736 18.825 62.5003 20.575 61.7536 21.975C61.0303 23.375 60.0386 24.4367 58.7786 25.16C57.5186 25.86 56.0836 26.21 54.4736 26.21ZM54.7536 23.27C55.9203 23.27 56.9703 23.0017 57.9036 22.465C58.8603 21.9283 59.607 21.17 60.1436 20.19C60.7036 19.1867 60.9836 18.0317 60.9836 16.725C60.9836 15.395 60.7036 14.2517 60.1436 13.295C59.607 12.315 58.8603 11.5567 57.9036 11.02C56.9703 10.4833 55.9203 10.215 54.7536 10.215C53.5636 10.215 52.502 10.4833 51.5686 11.02C50.6353 11.5567 49.8886 12.315 49.3286 13.295C48.7686 14.2517 48.4886 15.395 48.4886 16.725C48.4886 18.0317 48.7686 19.1867 49.3286 20.19C49.8886 21.17 50.6353 21.9283 51.5686 22.465C52.502 23.0017 53.5636 23.27 54.7536 23.27ZM61.0886 26V20.995L61.2986 16.69L60.9486 12.385V0.0299985H64.3086V26H61.0886ZM77.8761 26.21C75.8927 26.21 74.1427 25.8017 72.6261 24.985C71.1327 24.1683 69.9661 23.0483 69.1261 21.625C68.3094 20.2017 67.9011 18.5683 67.9011 16.725C67.9011 14.8817 68.2977 13.2483 69.0911 11.825C69.9077 10.4017 71.0161 9.29333 72.4161 8.5C73.8394 7.68333 75.4377 7.275 77.2111 7.275C79.0077 7.275 80.5944 7.67167 81.9711 8.465C83.3477 9.25833 84.4211 10.3783 85.1911 11.825C85.9844 13.2483 86.3811 14.9167 86.3811 16.83C86.3811 16.97 86.3694 17.1333 86.3461 17.32C86.3461 17.5067 86.3344 17.6817 86.3111 17.845H70.5261V15.43H84.5611L83.1961 16.27C83.2194 15.08 82.9744 14.0183 82.4611 13.085C81.9477 12.1517 81.2361 11.4283 80.3261 10.915C79.4394 10.3783 78.4011 10.11 77.2111 10.11C76.0444 10.11 75.0061 10.3783 74.0961 10.915C73.1861 11.4283 72.4744 12.1633 71.9611 13.12C71.4477 14.0533 71.1911 15.1267 71.1911 16.34V16.9C71.1911 18.1367 71.4711 19.245 72.0311 20.225C72.6144 21.1817 73.4194 21.9283 74.4461 22.465C75.4727 23.0017 76.6511 23.27 77.9811 23.27C79.0777 23.27 80.0694 23.0833 80.9561 22.71C81.8661 22.3367 82.6594 21.7767 83.3361 21.03L85.1911 23.2C84.3511 24.18 83.3011 24.9267 82.0411 25.44C80.8044 25.9533 79.4161 26.21 77.8761 26.21ZM90.4867 26V1.5H93.3567L104.347 20.015H102.807L113.657 1.5H116.527L116.562 26H113.202L113.167 6.785H113.972L104.312 23.025H102.702L92.9717 6.785H93.8467V26H90.4867ZM133.889 26V22.08L133.714 21.345V14.66C133.714 13.2367 133.294 12.14 132.454 11.37C131.638 10.5767 130.401 10.18 128.744 10.18C127.648 10.18 126.574 10.3667 125.524 10.74C124.474 11.09 123.588 11.5683 122.864 12.175L121.464 9.655C122.421 8.885 123.564 8.30167 124.894 7.905C126.248 7.485 127.659 7.275 129.129 7.275C131.673 7.275 133.633 7.89333 135.009 9.13C136.386 10.3667 137.074 12.2567 137.074 14.8V26H133.889ZM127.799 26.21C126.423 26.21 125.209 25.9767 124.159 25.51C123.133 25.0433 122.339 24.4017 121.779 23.585C121.219 22.745 120.939 21.8 120.939 20.75C120.939 19.7467 121.173 18.8367 121.639 18.02C122.129 17.2033 122.911 16.55 123.984 16.06C125.081 15.57 126.551 15.325 128.394 15.325H134.274V17.74H128.534C126.854 17.74 125.723 18.02 125.139 18.58C124.556 19.14 124.264 19.8167 124.264 20.61C124.264 21.52 124.626 22.255 125.349 22.815C126.073 23.3517 127.076 23.62 128.359 23.62C129.619 23.62 130.716 23.34 131.649 22.78C132.606 22.22 133.294 21.4033 133.714 20.33L134.379 22.64C133.936 23.7367 133.154 24.6117 132.034 25.265C130.914 25.895 129.503 26.21 127.799 26.21ZM148.612 26.21C146.746 26.21 145.299 25.7083 144.272 24.705C143.246 23.7017 142.732 22.2667 142.732 20.4V3.39H146.092V20.26C146.092 21.2633 146.337 22.0333 146.827 22.57C147.341 23.1067 148.064 23.375 148.997 23.375C150.047 23.375 150.922 23.0833 151.622 22.5L152.672 24.915C152.159 25.3583 151.541 25.685 150.817 25.895C150.117 26.105 149.382 26.21 148.612 26.21ZM139.582 10.215V7.45H151.412V10.215H139.582ZM163.329 26.21C161.346 26.21 159.596 25.8017 158.079 24.985C156.586 24.1683 155.419 23.0483 154.579 21.625C153.763 20.2017 153.354 18.5683 153.354 16.725C153.354 14.8817 153.751 13.2483 154.544 11.825C155.361 10.4017 156.469 9.29333 157.869 8.5C159.293 7.68333 160.891 7.275 162.664 7.275C164.461 7.275 166.048 7.67167 167.424 8.465C168.801 9.25833 169.874 10.3783 170.644 11.825C171.438 13.2483 171.834 14.9167 171.834 16.83C171.834 16.97 171.823 17.1333 171.799 17.32C171.799 17.5067 171.788 17.6817 171.764 17.845H155.979V15.43H170.014L168.649 16.27C168.673 15.08 168.428 14.0183 167.914 13.085C167.401 12.1517 166.689 11.4283 165.779 10.915C164.893 10.3783 163.854 10.11 162.664 10.11C161.498 10.11 160.459 10.3783 159.549 10.915C158.639 11.4283 157.928 12.1633 157.414 13.12C156.901 14.0533 156.644 15.1267 156.644 16.34V16.9C156.644 18.1367 156.924 19.245 157.484 20.225C158.068 21.1817 158.873 21.9283 159.899 22.465C160.926 23.0017 162.104 23.27 163.434 23.27C164.531 23.27 165.523 23.0833 166.409 22.71C167.319 22.3367 168.113 21.7767 168.789 21.03L170.644 23.2C169.804 24.18 168.754 24.9267 167.494 25.44C166.258 25.9533 164.869 26.21 163.329 26.21Z"
          fill="#EF7622"
        />
      </svg>
    </div>
  );
};